
const PageHeader = ({ background, title, subTitle, styles }) => {
    return (
        <div>
            <div className="hero h-[400px] md:h-[700px]" style={{ background: `url(${background}) no-repeat fixed` }}>
                <div className="hero-overlay bg-warning-content bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div>
                        <h1 className="mb-8 text-7xl font-bold">{title}</h1>
                        <br />
                        <p className="text-2xl divider divider-error">{subTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;