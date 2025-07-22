export default {
  data: {
    button: {
      create: "Create",
      edit: "Edit",
      update: "Update",
      delete: "Delete",
      import: "Import",
      export: "Export",
    },
    search: "Search…",
    error: {
      unknownError: "Unknown error",
      invalidForm: "Invalid form",
      emptyField: 'The field "{field}" is required',
      notANumber: 'The field "{field}" is not a valid number',
      insertFailed: "Creation failed",
      updateFailed: "Update failed",
      deleteFailed: "Deletion failed",
      importFailed: "Import failed",
      exportFailed: "Export failed",
      noReturnData: "No response",
      noFile: "Select a file",
      unreadableFile: "Unreadable file: {reason}",
      emptyFile: "Empty file",
      parsingError: "Error while extracting data: {reason}",
      invalidRow: "Invalid row {index}: {reason}",
    },
    import: {
      title: "Import from CSV file",
      csvInstructions: `
To be valid, the CSV file must follow these rules:
<ul>
  <li>The file must contain exactly the columns listed in the table below, all are mandatory.</li>
  <li>Column names must be written exactly as shown in the table (in lowercase).</li>
  <li>Values must be separated by commas.</li>
  <li>Texts containing commas must be enclosed in double quotes.</li>
  <li>If a text contains double quotes, they must be doubled (e.g.: "He said: ""Hello""").</li>
  <li>Numbers must use a period as the decimal separator and must not contain spaces (e.g.: 1234.56).</li>
  <li>Boolean values must be written as "true" or "false" (in lowercase).</li>
  <li>If the file is larger than 1MB, it must be split into multiple smaller files, each imported separately.</li>
</ul>`,
      table: {
        column: {
          key: "Name",
          type: "Type",
          nonNullable: "Required",
          info: "Notes",
        },
      },
      filePickerLabel: "Select a CSV file",
      overwrite: "Overwrite data in case of conflict",
    },
  },
} as const;
