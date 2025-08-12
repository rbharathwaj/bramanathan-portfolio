# Project Data Management System

## Overview
Your portfolio now uses a standardized JSON format for project data. Each project folder contains a `project-info.json` file that the portfolio automatically reads and displays.

## File Structure
```
public/
  projects/
    project 1 - prenac tools/
      project-info.json
      1.png
      2.png
      3.png
    project 2 - lattice coldplate/
      project-info.json
      1.png
      2.png
      3.png
      4.png
    project 3 - ev battery/
      project-info.json
      0.1.png
      1.png
      2.png
      ... (all images)
```

## JSON Format
Each `project-info.json` file contains:

```json
{
  "id": 1,
  "title": "Your Project Title",
  "company": "Company/University Name",
  "role": "Your Role/Position",
  "type": "corporate|academic|personal",
  "description": "Brief description for display",
  "detailedDescription": "Extended technical description",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "skills": ["Skill1", "Skill2", "Skill3"],
  "duration": "Project duration",
  "teamSize": "Team size",
  "keyAchievements": [
    "Achievement 1",
    "Achievement 2"
  ],
  "challenges": [
    "Challenge 1 and solution",
    "Challenge 2 and approach"
  ],
  "github": "GitHub URL (optional)",
  "external": "Demo URL (optional)", 
  "featured": true|false,
  "images": [
    "/projects/folder-name/image1.png",
    "/projects/folder-name/image2.png"
  ],
  "order": 1
}
```

## Key Features
- **Multi-image galleries**: All images in the folder are automatically displayed with navigation
- **Dynamic loading**: Projects are loaded from JSON files, no code changes needed
- **Structured data**: Comprehensive project information in a standard format
- **Future-proof**: Easy to add new projects or modify existing ones

## How to Add/Edit Projects

### Adding a New Project:
1. Create a new folder in `public/projects/`
2. Add your project images to the folder
3. Create a `project-info.json` file with all the required fields
4. The portfolio will automatically detect and display it

### Editing an Existing Project:
1. Simply edit the `project-info.json` file in the project folder
2. Changes appear immediately when you refresh the page

### Image Requirements:
- **Format**: JPG or PNG
- **Size**: 800x450px (16:9 aspect ratio) recommended
- **File size**: Under 500KB each for optimal loading

## Project Types:
- `"corporate"`: Company/internship projects (blue theme)
- `"academic"`: University/course projects (green theme)  
- `"personal"`: Side projects (purple theme)

## Display Logic:
- Projects with `"featured": true` appear in the main section
- Projects with `"featured": false` appear in "Other Notable Projects"
- Projects are sorted by the `"order"` field

This system makes it easy to maintain your portfolio and add new projects without touching any code!