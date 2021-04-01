import * as React from 'react';

const Upload = () => {
    return (
        <div className="main-container">
            <input aria-label="file-upload" type="file" id="uploader" accept=".csv"/>
        </div>
    )
}

export default Upload;