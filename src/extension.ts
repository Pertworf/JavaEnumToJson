import * as vscode from 'vscode';
import javaenumtojson from './plugins/javaenumtojson';

export function activate(context: vscode.ExtensionContext) {
	const javaEnumToJson = vscode.commands.registerCommand(
		'javaenumtojson.JavaEnumToJson',
		javaenumtojson
	);
	context.subscriptions.push(javaEnumToJson);
}

export function deactivate() {}
