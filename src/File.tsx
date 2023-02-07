import React, { ReactElement } from 'react';
import { ContentState } from 'draft-js';
import clsx from 'clsx';
import styles from "./File.module.scss";
import {FilePluginTheme} from './';
import {AddFileProps} from "./types/constant";

export interface FileProps extends React.ComponentPropsWithRef<'a'> {
    blockProps: { data: AddFileProps, extraData: Record<string, unknown> };
    className?: string;
    theme?: FilePluginTheme;

    //removed props
    blockStyleFn: unknown;
    block: unknown;
    contentState: ContentState;
    customStyleMap: unknown;
    customStyleFn: unknown;
    decorator: unknown;
    forceSelection: unknown;
    offsetKey: unknown;
    selection: unknown;
    tree: unknown;
    preventScroll: unknown;
}

export const trimExtension = (extension: string) => extension.length > 4 ? extension.slice(0, 4) : extension;

export default React.forwardRef<HTMLAnchorElement, FileProps>(
    function File(props, ref): ReactElement {
        const {
            blockStyleFn,
            block,
            contentState,
            customStyleMap,
            customStyleFn,
            decorator,
            forceSelection,
            offsetKey,
            selection,
            tree,
            preventScroll,
            className, theme = {}, blockProps, ...elementProps
        } = props;
        const combinedClassName = clsx(styles.fileAttachment, theme.fileAttachment, className);
        const {data} = blockProps;
        return (
            <div className={styles.fileWrapper}>
                <a
                    target="_blank"
                    ref={ref}
                    href={data.href}
                    className={combinedClassName}
                    {...elementProps}
                >
                    <div className={styles.extensionWrapper}>
                        {data.icon}
                        <span className={styles.extension}>{trimExtension(data.extension)}</span>
                    </div>
                    <div className={styles.name}>
                        <p>{data.name}</p>
                        <span>{data.size}</span>
                    </div>
                </a>
            </div>
        );
    }
);
