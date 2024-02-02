import { useEffect } from "react";
import './KpiPage.scss';
import { useNavigate } from "react-router-dom";
import KpiList from "../../components/KpiList/KpiList";

const KpiPage = ({userId}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    },[userId, navigate]

    )
    return (
        <main className="kpi-page">
            <KpiList userId={userId}/>
        </main>
    );
};

export default KpiPage;