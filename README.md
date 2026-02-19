# 🏋️ KeepFit

**Keep fit, feel better** - A modern fitness web app for discovering 1000+ exercises by body parts, muscles, and equipments. built with Next.js and React.

## 💻 Screenshots

image.png 

## ✨ Features

- 🔍 **Smart Search** - Real-time exercise search with debounced API calls for optimal performance
- 🎯 **Browse by Muscle Groups** 
- 💪 **Browse by Body Parts** 
- 🏃 **Browse by Equipment** 
- 📊 **Detailed Exercise Pages** - View exercise instructions, animated GIFs, and targeted muscles
- 🎨 **Modern UI/UX** - Clean design with smooth animations

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6
- **UI Library:** React 19.2.3
- **Styling:** Custom CSS with modern animations
- **API:** ExerciseDB API https://exercisedb.dev/
- **Compiler:** React Compiler enabled for enhanced performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

2. Install dependencies:

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app

## 📁 Project Structure

```
fitness/
├── app/
│   ├── [singleExercise]/      # Dynamic route for individual exercise details
│   ├── bodyParts/              # Body parts browsing and filtering
│   │   └── [bodyPartsExercises]/
│   ├── muscles/                # Muscle groups browsing and filtering
│   │   └── [muscleExercises]/
│   ├── equipments/             # Equipment-based filtering
│   │   └── [equipmentsExercises]/
│   ├── components/             # Reusable components
│   │   ├── Navbar.js
│   │   └── SearchBar.js
│   ├── globals.css             # Global styles and animations
│   ├── layout.js               # Root layout
│   └── page.js                 # Home page
└── public/
    └── assets/                 # Images and static assets
```

## 🎯 Use Cases

- Find exercises for specific muscle groups
- Filter exercises by available equipment at home or gym
- Learn proper exercise techniques with animated GIFs
- Build personalized workout plans based on your goals


## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

---

Made with ❤️.
