import { useGlobalState } from '../../context/GlobalContext';

export default function Home() {

    const globalState = useGlobalState();

    return (
        <>
            <h1>Home</h1>
            {JSON.stringify(globalState)}
        </>
    );
}