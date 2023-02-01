export const FILETYPE = 'FILE';
export const ATOMIC = 'atomic';

export interface AddFileProps {
    href: string,
    extension: string,
    name: string,
    size: string,
    icon: JSX.Element,
    extraData: Record<string, unknown>
}
