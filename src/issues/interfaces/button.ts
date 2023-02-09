
export interface Button{
    icon: string,
    color?: string,
    size: SizeButton,               //'xs'|'sm'|'md'|'lg'|'xl'
    action: () => void
}

export enum SizeButton {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    xl = 'xl',
}