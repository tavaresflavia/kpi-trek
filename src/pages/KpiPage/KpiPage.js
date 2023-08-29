import { useEffect } from "react";
import KpiCard from "../../components/KpiCard/KpiCard";
import KpiForm from "../../components/KpiForm/KpiForm";
import './KpiPage.scss';
import { useNavigate } from "react-router-dom";

const KpiPage = ({userId}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    },[userId]

    )
    return (
        <div className="kpi-page">
            <KpiCard/>
            <KpiCard/>
            <KpiCard/>
            <KpiCard/>
            <KpiCard/>
            <KpiForm/>
            
        </div>
    );
};

export default KpiPage;