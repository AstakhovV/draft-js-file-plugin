import React, { AnchorHTMLAttributes, ReactElement } from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import clsx from 'clsx';
import { FilePluginTheme } from './';

export interface FileProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    block: ContentBlock;
    className?: string;
    theme?: FilePluginTheme;
    contentState: ContentState;
    }

export default React.forwardRef<HTMLAnchorElement, FileProps>(
    function File(props, ref): ReactElement {
        const { block, className, theme = {}, ...otherProps } = props;
        const { contentState, ...elementProps } = otherProps;
        const combinedClassName = clsx(theme.file, className);
        const { href } = contentState.getEntity(block.getEntityAt(0)).getData();
        return (
            <a
                {...elementProps}
                ref={ref}
                href={href}
                className={combinedClassName}
            />
        );
    }
);
