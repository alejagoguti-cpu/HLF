#!/bin/bash
# imprime solo el resultado del último volcado de Revit
f=$(ls -t /c/Users/aleja/.claude/projects/C--Users-aleja/f8370dd0-a39b-414a-a015-0426ef83ab01/tool-results/mcp-horizun-revit-horizun_execute_python-*.txt | head -1)
node -e "const d=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(d.output).slice(0,900));if(d.failures&&d.failures.length)console.log('fallos',JSON.stringify(d.failures).slice(0,300));if(!d.executed)console.log(JSON.stringify(d).slice(0,600))" "$f"
