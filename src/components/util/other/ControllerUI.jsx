import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';

export default function ControllerUI() {

    const [hideDPad, setHideDPad] = useState(false);
    let hideBtnContent = '';

    if (hideDPad) {
        hideBtnContent = 'Show Btn';
    } else {
        hideBtnContent = 'Hide Btn';
    }

    return (
        <div className='controller-root' style={{ display: 'flex', gap: '50px' }}>
            <div className='move-buttons' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                <button style={{ width: '176px', height: '176px', backgroundColor: '#D9D9D9', border: '3px solid black' }}>
                    <FaChevronUp size={100} />
                </button>
                <button style={{ width: '176px', height: '176px', backgroundColor: '#D9D9D9', border: '3px solid black' }}>
                    <FaChevronDown size={100} />
                </button>
            </div>

            <div style={{ alignSelf: 'center', width: '150px' }}>
                <div
                    style={{
                        display: hideDPad ? 'none' : 'grid',
                        gridTemplateColumns: 'auto auto auto',
                        gridTemplateRows: 'auto auto auto',
                        maxWidth: '150px'
                    }}>
                    <button
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid black',
                            borderRadius: '60px',
                            gridColumn: '2',
                            gridRow: '1',
                            backgroundColor: '#D9D9D9'
                        }}>
                        <FaArrowUp size={24} />
                    </button>
                    <button
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid black',
                            borderRadius: '60px',
                            gridColumn: '2',
                            gridRow: '3',
                            backgroundColor: '#D9D9D9'
                        }}>
                        <FaArrowDown size={24} />
                    </button>
                    <button
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid black',
                            borderRadius: '60px',
                            gridColumn: '1',
                            gridRow: '2',
                            backgroundColor: '#D9D9D9'
                        }}>
                        <FaArrowLeft size={24} />
                    </button>
                    <button
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid black',
                            borderRadius: '60px',
                            gridColumn: '3',
                            gridRow: '2',
                            backgroundColor: '#D9D9D9'
                        }}>
                        <FaArrowRight size={24} />
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <button onClick={(e) => setHideDPad(s => !s)}
                    style={{
                        alignSelf: 'center',
                        backgroundColor: '#D9D9D9',
                        padding: '5px',
                        margin: '10px',
                        width: 'fit-content',
                        height: 'fit-content'
                    }}>
                    {hideBtnContent}
                </button>
                <button style={{ backgroundColor: '#D9D9D9', width: '250px', height: '250px', borderRadius: '300px', border: '3px solid black', fontSize: '30px' }}>Shoot / Ok</button>
            </div>
        </div>
    );
}