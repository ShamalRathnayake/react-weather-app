import React from 'react'
import { RingLoader } from 'react-spinners';
import { css } from "@emotion/core";
import './loading.css'


const override = css`
  display: block;
  margin: 0 auto;
  border-color: #000;
`;

const Loading = () => {
    return (
        <div className="loading">
            <div className="sweet-loading">
                <RingLoader
                    css={override}
                    size={50}
                    color={"#6eb1f4"}
                    loading
                />
            </div>
        </div>
    )
}

export default Loading
