import './SegmentedControl.css';

const SegmentedControl = ({activeOption ,setActiveOption}) => {
    return (
        <div id="inputContainer">
            <fieldset id="aspectRatio--group" className="inputGroup">
                <div className="segmentedControl useSlidingAnimation" style={{ '--options': 2, '--options-active': activeOption }}>
                    <span className="segmentedControl--group">
                        <input type="radio" name="aspectRatio" id="aspectRatio--16x9" checked={activeOption === 1} onClick={() => setActiveOption(1)} />
                        <label className="label" htmlFor="aspectRatio--16x9">Name</label>
                    </span>
                    <span className="segmentedControl--group">
                        <input type="radio" name="aspectRatio" id="aspectRatio--1x1" checked={activeOption === 2} onClick={() => setActiveOption(2)} />
                        <label className="label" htmlFor="aspectRatio--1x1">RegNo</label>
                    </span>
                </div>
            </fieldset>
        </div>
    );
};

export default SegmentedControl;
