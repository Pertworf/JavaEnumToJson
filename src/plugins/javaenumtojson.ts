import * as vscode from 'vscode';
const { showInformationMessage, showErrorMessage } = vscode.window;

const matchEnumNameRegExp = new RegExp(/(?<=(enum))(?<name>.*?)(?=\{)/gs);
const matchEnumContentRegExp = new RegExp(/(?<=\{)(?<content>.*?)(?=\})/gs);
const matchAllEnumCodeDescRegExp = new RegExp(/(?<=\()(.*?)(?=\))/gs);

type NameContent = [IterableIterator<RegExpMatchArray>, string] | undefined;

const javaenumtojson = async () => {
	const clipboardText = await vscode.env.clipboard.readText();
	const res = getNameContent(clipboardText);
	if (res) {
		const [content, name] = res!;
		const output = parseEnumContenToJson(content, name);
		insertIntoEditor(output);
	}
};

function insertIntoEditor(text: string) {
	const { activeTextEditor } = vscode.window;
	activeTextEditor &&
		activeTextEditor.insertSnippet(new vscode.SnippetString(text));
}

function getNameContent(clipboardCopyedText: string): NameContent {
	try {
		const [name] = clipboardCopyedText.match(matchEnumNameRegExp) || [];
		const [content] = clipboardCopyedText.match(matchEnumContentRegExp) || [];
		if (!name) {
			showErrorMessage('Invalid Enum');
			return;
		} else if (!content) {
			showErrorMessage('Invalid Enum');
			return;
		}
		const res = content.matchAll(matchAllEnumCodeDescRegExp);
		return [res, name];
	} catch (error) {
		showErrorMessage(
			'Formatting failure,Ensure that the Enum format is correct'
		);
	}
	return;
}

function parseEnumContenToJson(
	content: IterableIterator<RegExpMatchArray>,
	name: string
): string {
	const map: Record<string, string> = {};
	let output = '';
	for (const e of content) {
		const [s] = e;
		const [key, value] = s.split(',');
		const k = key.replaceAll(/\"/g, '');
		const v = value.replaceAll(/\"/g, '').trim();
		map[k] = v;
		output += `\t${k}:'${v}',\n`;
	}
	output = `const ${name} = {\n${output}}`;
	return output;
}

export default javaenumtojson;
