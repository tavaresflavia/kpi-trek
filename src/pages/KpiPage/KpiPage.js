import KpiCard from "../../components/KpiCard/KpiCard";
import KpiForm from "../../components/KpiForm/KpiForm";
import './KpiPage.scss';

const KpiPage = () => {
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