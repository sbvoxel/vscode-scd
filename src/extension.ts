import { workspace, ExtensionContext } from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
    Executable,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    const serverExecutable: Executable = {
        command: 'scope-lsp',
        args: [],
        // options
        transport: TransportKind.stdio, // or ipc
    };

    const serverOptions: ServerOptions = serverExecutable;

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'sc' }],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('/scope.conf'),
        },
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        'scope-lsp',
        'Scope Language Server',
        serverOptions,
        clientOptions,
    );

    // Start the client. This will also launch the server
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
