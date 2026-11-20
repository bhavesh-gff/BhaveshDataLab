# Graph Report - bhavesh-datalab  (2026-11-20)

## Corpus Check
- 29 files · ~102,440 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 134 nodes · 185 edges · 15 communities (11 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f34ae334`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- compilerOptions
- framer-motion
- lucide-react
- page.tsx
- dependencies
- devDependencies
- SkillsSection.tsx
- ContactSection.tsx
- ProofSection.tsx
- scripts
- next.config.mjs
- next-env.d.ts
- postcss.config.mjs
- global.d.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `framer-motion` - 12 edges
3. `lucide-react` - 10 edges
4. `react` - 8 edges
5. `scripts` - 5 edges
6. `Project` - 5 edges
7. `profileData` - 4 edges
8. `clsx` - 2 edges
9. `next` - 2 edges
10. `tailwind-merge` - 2 edges

## Surprising Connections (you probably didn't know these)
- `CaseStudyModalProps` --references--> `Project`  [EXTRACTED]
  src/components/projects/CaseStudyModal.tsx → src/data/projects.ts
- `ProjectCardProps` --references--> `Project`  [EXTRACTED]
  src/components/projects/ProjectCard.tsx → src/data/projects.ts

## Import Cycles
- None detected.

## Communities (15 total, 4 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (17): name, private, version, autoprefixer, clsx, next, postcss, react-dom (+9 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "framer-motion"
Cohesion: 0.20
Nodes (10): framer-motion, DataLabVisual(), DataLabVisualProps, HeroSection(), HeroSectionProps, ProfileSection(), ProfileSectionProps, RecruiterViewSection() (+2 more)

### Community 3 - "lucide-react"
Cohesion: 0.25
Nodes (10): lucide-react, CaseStudyModal(), CaseStudyModalProps, ProjectCard(), ProjectCardProps, ProjectsSection(), ProjectsSectionProps, CaseStudy (+2 more)

### Community 4 - "page.tsx"
Cohesion: 0.22
Nodes (8): react, Navbar(), NavbarProps, BackgroundEnvironment(), CustomCursor(), CustomCursorProps, DataWorkflowSection(), WorkflowStep

### Community 5 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, clsx, framer-motion, lucide-react, next, react, react-dom, tailwind-merge

### Community 6 - "devDependencies"
Cohesion: 0.25
Nodes (8): devDependencies, autoprefixer, postcss, tailwindcss, @types/node, @types/react, @types/react-dom, typescript

### Community 7 - "SkillsSection.tsx"
Cohesion: 0.38
Nodes (5): SkillsSection(), SkillsSectionProps, SkillCategory, SkillItem, skillsData

### Community 8 - "ContactSection.tsx"
Cohesion: 0.40
Nodes (4): ContactSection(), ContactSectionProps, SocialLink, socialLinks

### Community 9 - "ProofSection.tsx"
Cohesion: 0.40
Nodes (4): ProofSection(), ProofSectionProps, certificationsData, Credential

### Community 10 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

## Knowledge Gaps
- **65 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 74 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `framer-motion` connect `framer-motion` to `package.json`, `lucide-react`, `page.tsx`, `SkillsSection.tsx`, `ProofSection.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `package.json`, `framer-motion`, `page.tsx`, `SkillsSection.tsx`, `ContactSection.tsx`, `ProofSection.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `react` connect `page.tsx` to `package.json`, `framer-motion`, `lucide-react`, `SkillsSection.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._