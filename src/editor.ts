import * as vscode from 'vscode';
import * as path from 'path';


export const workspaceRoot = () => vscode.workspace.rootPath;

export function currentEditorPath(): string {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) return;
  
    const currentFilePath = path.dirname(activeEditor.document.fileName);
    const rootMatcher = new RegExp(`^${workspaceRoot()}`);
    const relativeCurrentFilePath = currentFilePath.replace(rootMatcher, '');
  
    return relativeCurrentFilePath;
  }

  export function openFile(absolutePath: string): PromiseLike<string> {
    return vscode.workspace.openTextDocument(absolutePath)
      .then((textDocument): PromiseLike<string> => {
        if (textDocument) {
          vscode.window.showTextDocument(textDocument);
          return Promise.resolve(absolutePath);
        } else {
          return Promise.reject('Could not open document');
        }
      });
  }

  export function selectedText() {
    const editor = vscode.window.activeTextEditor;
    const selection = editor.selection;
    return editor.document.getText(selection);
  }
  

  export function showInputBox(defaultValue, placeHolder) {
    return vscode.window.showInputBox({
        value: defaultValue,
        placeHolder
      });
  }


 export function showQuickPicksList(choices, placeHolder = '') {
    return vscode.window.showQuickPick<vscode.QuickPickItem>(choices, {
      placeHolder
    }) 
  };

  export const convertRelativeToFullPath = relativePath => path.join(workspaceRoot(), relativePath);
  
  export const extractQuickPickValue = selection => {
    if (!selection)
      return;
    return selection.label;
  };
  
  export const toQuickPick = (label: string, description?) => ({label, description});
  
  export const toQuickPicksList =  (choices: string[]) =>  choices.map(toQuickPick);
  
  export const showErrorMessage = ({message}) => vscode.window.showErrorMessage(message);