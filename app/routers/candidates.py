from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.database import get_database
from app.schemas.candidate import CandidateCreate, CandidateResponse
from app.services.candidate_service import CandidateService
from app.services.resume_parser_service import ResumeParserService
from app.models.candidate import Candidate


router = APIRouter()

@router.post("/", response_model=CandidateResponse)
async def create_candidate(
    candidate: CandidateCreate,
    db: Session = Depends(get_database)
):
    """Create a new candidate with automatic duplicate detection"""
    candidate_service = CandidateService(db)
    
    try:
        result = candidate_service.create_candidate(candidate)
        
        # Return appropriate status code based on action
        if result["action"] == "created":
            return {
                "status": "success",
                "message": result["message"],
                "candidate": result["candidate"],
                "is_new": True
            }
        else:  # action == "exists"
            return {
                "status": "exists",
                "message": result["message"],
                "candidate": result["candidate"],
                "is_new": False
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Candidate creation failed: {str(e)}")


@router.get("/", response_model=List[CandidateResponse])
async def get_candidates(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_database)
):
    """Get all candidates with pagination"""
    candidate_service = CandidateService(db)
    return candidate_service.get_candidates(skip=skip, limit=limit)

@router.get("/{candidate_id}", response_model=CandidateResponse)
async def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_database)
):
    """Get specific candidate by ID"""
    candidate_service = CandidateService(db)
    candidate = candidate_service.get_candidate(candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate


@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_database)
):
    """Upload and parse resume with automatic duplicate handling"""
    
    # Validate file type
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file format. Please upload a PDF or DOCX file."
        )
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Parse resume
        resume_parser = ResumeParserService()
        candidate_data = resume_parser.parse_resume_to_candidate(file_content, file.filename)
        
        # Create candidate with automatic duplicate handling
        candidate_service = CandidateService(db)
        result = candidate_service.create_candidate(candidate_data)
        
        # Return response based on what happened
        if result["action"] == "created":
            return {
                "status": "success",
                "message": "Resume uploaded and new candidate created successfully",
                "candidate": result["candidate"],
                "filename": file.filename,
                "is_new": True
            }
        else:  # action == "exists"
            return {
                "status": "exists", 
                "message": f"Candidate with email {candidate_data.email} already exists",
                "candidate": result["candidate"],
                "filename": file.filename,
                "is_new": False,
                "note": "Resume was processed but candidate already exists in database"
            }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume processing failed: {str(e)}")

@router.post("/parse-resume-preview")
async def parse_resume_preview(file: UploadFile = File(...)):
    """Parse resume and return extracted data without saving to database"""
    
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file format. Please upload a PDF or DOCX file."
        )
    
    try:
        file_content = await file.read()
        resume_parser = ResumeParserService()
        candidate_data = resume_parser.parse_resume_to_candidate(file_content, file.filename)
        
        return {
            "status": "success",
            "parsed_data": candidate_data.dict(),
            "message": "Resume parsed successfully. Review and confirm to save."
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume parsing failed: {str(e)}")
    
@router.delete("/{candidate_id}")
async def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_database)
):
    """Delete candidate by ID"""
    candidate_service = CandidateService(db)
    
    try:
        result = candidate_service.delete_candidate(candidate_id)
        
        if result["success"]:
            return {
                "status": "success",
                "message": result["message"],
                "deleted_candidate": result["candidate"]
            }
        else:
            raise HTTPException(
                status_code=404,
                detail={
                    "error": "Candidate not found",
                    "message": result["message"],
                    "candidate_id": candidate_id
                }
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")

@router.delete("/by-email/{email}")
async def delete_candidate_by_email(
    email: str,
    db: Session = Depends(get_database)
):
    """Delete candidate by email address"""
    candidate_service = CandidateService(db)
    
    try:
        # Find candidate by email first
        candidate = db.query(Candidate).filter(Candidate.email == email).first()
        
        if not candidate:
            raise HTTPException(
                status_code=404,
                detail={
                    "error": "Candidate not found",
                    "message": f"No candidate found with email {email}",
                    "email": email
                }
            )
        
        # Delete using the ID
        result = candidate_service.delete_candidate(candidate.id)
        
        return {
            "status": "success",
            "message": result["message"],
            "deleted_candidate": result["candidate"]
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")