import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./auth";
const HeroesApp = () => {
    return (
        <>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </>
    );
};
export default HeroesApp;
