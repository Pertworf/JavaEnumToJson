import * as vscode from 'vscode';
const { showInformationMessage, showErrorMessage } = vscode.window;
export function activate(context: vscode.ExtensionContext) {
	const javaEnumToJson = vscode.commands.registerCommand(
		'javaenumtojson.JavaEnumToJson',
		async () => {
			try {
				const clipboardText = await vscode.env.clipboard.readText();
				const name = /(?<=(enum))(?<name>.*?)(?=\{)/gs.exec(clipboardText);
				const content = /(?<=\{)(?<content>.*?)(?=\})/gs.exec(clipboardText);
				if (!name || !name?.groups!.name) {
					showErrorMessage('Invalid Enum');
					return;
				} else if (!content || !content?.groups!.content) {
					showErrorMessage('Invalid Enum');
					return;
				}
				const res = content.groups.content.matchAll(/(?<=\()(.*?)(?=\))/gs);
				const map: Record<string, string> = {};
				let output = '';
				for (const e of res) {
					const [s] = e;
					const [key, value] = s.split(',');
					const k = key.replaceAll(/\"/g, '');
					const v = value.replaceAll(/\"/g, '').trim();
					map[k] = v;
					output += `\t${k}:'${v}',\n`;
				}
				output = `const ${name.groups.name} = {\n${output}}`;
				vscode.env.clipboard.writeText(output);
				showInformationMessage(
					'Once the formatting is complete!You can try pasting it into the document.'
				);
			} catch (error) {
				showErrorMessage('error');
			}
		}
	);
	context.subscriptions.push(javaEnumToJson);
}

export function deactivate() {}
