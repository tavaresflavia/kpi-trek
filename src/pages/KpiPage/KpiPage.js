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
        <div className="kpi-page">
            <KpiList userId={userId}/>

            
        </div>
    );
};

export default KpiPage;