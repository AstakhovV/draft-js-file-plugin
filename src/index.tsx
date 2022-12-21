import React, { ComponentType, ReactElement } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import addFile from './modifiers/addFile';
import FileComponent, { FileProps } from './File';

export interface FilePluginTheme {
    fileAttachment?: string;
}

const defaultTheme: FilePluginTheme = {};

export interface FilePluginConfig {
    decorator?: (component: ComponentType<FileProps>) => ComponentType<FileProps>;
    theme?: FilePluginTheme;
    fileComponent?: ComponentType<FileProps>;
}

export type FileEditorPlugin = EditorPlugin & {
    addFile: typeof addFile;
};

export default (config: FilePluginConfig = {}): FileEditorPlugin => {
    const initialTheme = config.theme ?? defaultTheme;
    let FileLink = config.fileComponent ?? FileComponent as ComponentType<FileProps>;
    if (config.decorator) {
        FileLink = config.decorator(FileLink);
    }
    const ThemedFile = (props: FileProps): ReactElement => <FileLink {...props} theme={initialTheme} />

    return {
        blockRendererFn: (block, { getEditorState }) => {
            if (block.getType() === 'atomic') {
                const contentState = getEditorState().getCurrentContent();
                const entity = block.getEntityAt(0);
                if (!entity) return null;
                const type = contentState.getEntity(entity).getType();
                if (type === 'FILE') {
                    return {
                        component: ThemedFile,
                        editable: false,
                    };
                }
                return null;
            }

            return null;
        },
        addFile,
    };
};

export const File = FileComponent;
