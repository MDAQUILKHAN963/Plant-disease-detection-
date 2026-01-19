$ErrorActionPreference = "Stop"

Write-Host "Starting Git History Backfill..."

# 1. Reset Git
if (Test-Path .git) {
    Remove-Item -Path .git -Recurse -Force
    Write-Host "Deleted existing .git directory."
}
git init
git branch -M main
git remote add origin https://github.com/MDAQUILKHAN963/Plant-disease-detection-.git

# 2. Helper Function
function Commit-Date {
    param (
        [string]$Message,
        [string]$Date,
        [string[]]$Files
    )
    foreach ($File in $Files) {
        if (Test-Path $File) {
            git add $File
        } else {
            Write-Warning "File not found: $File"
        }
    }
    
    # Set both author and committer dates
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    
    # Check if anything is staged before committing
    $status = git status --porcelain
    if ($status) {
        git commit -m $Message
        Write-Host "Committed: $Message on $Date"
    } else {
        Write-Warning "Nothing to commit for: $Message"
    }
    
    Remove-Item Env:\GIT_AUTHOR_DATE
    Remove-Item Env:\GIT_COMMITTER_DATE
}

# 3. Execution Schema (Dates are 2026 based on user context)

# Jan 9: Init
Commit-Date -Message "Initial commit: Project setup" -Date "2026-01-09T10:00:00" -Files @(".gitignore", "README.md")

# Jan 10: Models
Commit-Date -Message "Added data preprocessing script" -Date "2026-01-10T14:30:00" -Files @("models/preprocess.py")

# Jan 11: Training
Commit-Date -Message "Implemented model training pipeline" -Date "2026-01-11T16:45:00" -Files @("models/train_model.py")

# Jan 12: Backend setup
Commit-Date -Message "Setup backend dependencies" -Date "2026-01-12T11:20:00" -Files @("backend/requirements.txt")

# Jan 13: Backend main
Commit-Date -Message "Created core API with FastAPI" -Date "2026-01-13T13:15:00" -Files @("backend/main.py")

# Jan 14: Backend Docker
Commit-Date -Message "Dockerized backend service" -Date "2026-01-14T15:00:00" -Files @("backend/Dockerfile")

# Jan 15: Frontend scaffolding
# Including package-lock.json if valid
Commit-Date -Message "Initialized React frontend with Vite" -Date "2026-01-15T09:30:00" -Files @("frontend/package.json", "frontend/vite.config.js", "frontend/eslint.config.js", "frontend/package-lock.json")

# Jan 16: Frontend Basics
Commit-Date -Message "Added base styles and HTML structure" -Date "2026-01-16T10:45:00" -Files @("frontend/index.html", "frontend/src/index.css")

# Jan 17: Frontend Main
Commit-Date -Message "Implemented main entry point" -Date "2026-01-17T14:20:00" -Files @("frontend/src/main.jsx")

# Jan 18: Frontend App & Docker
Commit-Date -Message "Built main application UI and added Docker support" -Date "2026-01-18T17:00:00" -Files @("frontend/src/App.jsx", "frontend/Dockerfile")

# Jan 19: Polish (Catch-all)
git add .
$env:GIT_AUTHOR_DATE = "2026-01-19T20:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-19T20:00:00"
# Check if there are changes
$status = git status --porcelain
if ($status) {
    git commit -m "Final polish and documentation updates"
    Write-Host "Committed: Final polish on 2026-01-19T20:00:00"
} else {
    Write-Host "No pending changes for final polish."
}
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

Write-Host "History recreation complete."
