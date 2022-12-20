import React, { ReactElement } from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import clsx from 'clsx';
import styles from "./File.module.scss";
import {FilePluginTheme} from './';

export interface FileProps extends React.ComponentPropsWithRef<'a'> {
    block: ContentBlock;
    className?: string;
    theme?: FilePluginTheme;
    contentState: ContentState;

    //removed props
    blockStyleFn: unknown;
    blockProps: unknown;
    customStyleMap: unknown;
    customStyleFn: unknown;
    decorator: unknown;
    forceSelection: unknown;
    offsetKey: unknown;
    selection: unknown;
    tree: unknown;
    preventScroll: unknown;
}

export const trimExtension = (extension: string) => extension.slice(0, 4);

export default React.forwardRef<HTMLAnchorElement, FileProps>(
    function File(props, ref): ReactElement {
        const {
            blockProps,
            blockStyleFn,
            customStyleMap,
            customStyleFn,
            forceSelection,
            offsetKey,
            preventScroll,
            block, className, theme = {}, contentState, ...elementProps
        } = props;
        const combinedClassName = clsx(styles.fileAttachment, theme.fileAttachment, className);
        const {href, extension, name, size, icon} = contentState.getEntity(block.getEntityAt(0)).getData();
        return (
            <a
                target="_blank"
                ref={ref}
                href={href}
                className={combinedClassName}
                {...elementProps}
            >
                <div className={styles.wrapper}>
                    {icon}
                    <span className={styles.extension}>{trimExtension(extension)}</span>
                </div>
                <div className={styles.name}>
                    <p>{name}</p>
                    <span>{size}</span>
                </div>
            </a>
        );
    }
);
