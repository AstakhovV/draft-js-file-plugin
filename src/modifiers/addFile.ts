import { EditorState, AtomicBlockUtils } from 'draft-js';

export default (
    editorState: EditorState,
    href: string,
    extension: string,
    name: string,
    size: string,
    icon: JSX.Element,
    extraData: Record<string, unknown>
): EditorState => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'FILE',
        'IMMUTABLE',
        { ...extraData, href, extension, name, size, icon }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    );
    return EditorState.forceSelection(
        newEditorState,
        newEditorState.getCurrentContent().getSelectionAfter()
    );
};
