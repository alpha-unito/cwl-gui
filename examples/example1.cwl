class: CommandLineTool
label: Esempio di tool
inputs:
  - id: inputVariabile
    type: string
    inputBinding:
      position: 4
      prefix: '--input-variable'
outputs:
  - id: output1
    type: stdout
cwlVersion: v1.2
baseCommand:
  - ./esempio_script.sh
