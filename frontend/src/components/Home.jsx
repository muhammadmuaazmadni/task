import { useGlobalState, useGlobalStateUpdate } from './../context/GlobalContext';

export default function Home() {

    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    return (
        <>
            <h1>Home</h1>
            {JSON.stringify(globalState)}
        </>

    );
}