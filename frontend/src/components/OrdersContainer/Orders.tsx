import { useAppSelector } from '../../hooks';

const Orders = () => {
    const { manager } = useAppSelector((state) => state.auth);
    console.log(manager);
    return <div></div>;
};

export { Orders };
