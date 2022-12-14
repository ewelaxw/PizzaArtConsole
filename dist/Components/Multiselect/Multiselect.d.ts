export declare type Item = {
    label: string;
    value: string;
    isSelected: boolean;
};
export declare type SelectedItem = {
    label: string;
    value: string;
};
declare type Props = {
    items: Item[];
    onSubmit: Function;
};
declare const Multiselect: (props: Props) => JSX.Element;
export default Multiselect;
