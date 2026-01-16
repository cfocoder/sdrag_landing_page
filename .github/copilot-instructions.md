# code_rules.md

Describes the rules to write code

## Who am I?

I'm Héctor Sanchez, born on February 2nd, 1974. I am a CPA, Financial Analyst and Anlytics Engineer with over 30 years of work experience in companies like KPMG, Motorola, Flextronics, JLL, HP, HPE, Micro Focus, OpenText and currently working at Weave Communications. I'm currently studying a Master's Degree in Data Science and Artificial Intelligence at Universidad de Guadalajara in Guadalajara, Jalisco, Mexico where live.

## Guidelines

- I use uv to install virtual environments and python libraries
- Write the minimum necessary code to deliver the result
- Write the minimum necessary comments or markdown explanations without being too verboise
- Always prefer simple and elegant code for better clarity
- Don't overuse print statements, including decorative lines, or redudant messages, as they make the code messy, noisy and hard to read
- When creating charts in Python, either in a Notebook or in a script, always use Vega-Altair
- When executing python scripts, use python3  

## Use of Tools

Feel free to use Context7 or any other MCP tool in case you need to search for information or get documentation about the libraries or tools you are using

## Use of SKILLs

You have access to skills. Agent Skills are folders of instructions, scripts, and resources that Copilot or Antigravity can load when relevant to improve its performance in specialized tasks.

### Skill Discovery

- Skills are typically stored in `~/.claude/skills/` directory or in the project's `.claude/skills/` directory or in the `.github/skills/` directory

- Antigravity skills, are stored in either <workspace-root>/.agent/skills/<skill-folder>/ Workspace-specific or at
  ~/.gemini/antigravity/skills/<skill-folder>/ Global (all workspaces)

- Each skill is contained in its own subdirectory within the skills directory
- Skills can be discovered and loaded automatically by the agent when relevant to the task at hand
- Each skill has a `SKILL.md` file with metadata and usage instructions
- The test suite verifies skill structure and content requirements

## Tailscale Network

I have a network of 5 computers using Tailscale and they are configured so you can access them without any password in the following way:

- ssh cfocoder3
- ssh macmini
- ssh vostro
- ssh inspiron13
- ssh inspiron15
