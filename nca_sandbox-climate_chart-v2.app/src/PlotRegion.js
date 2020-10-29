// // import React, { useRef } from "react";
// //
// // export default function PlotRegion(props) {
// //   const textInput = useRef();
// //   console.log('responsiveChartRef', textInput)
// //   const focusTextInput = () => textInput.current.focus();
// //
// //   return (
// //     <>
// //       <input type="text" ref={textInput} />
// //       <button onClick={focusTextInput}>Focus the text input</button>
// //     </>
// //   );
// // }
// //
//
// import React, { useEffect, useState, useRef, createRef } from 'react';
// import Plot from 'react-plotly.js';
//
// const defaultLayout =  {
//   layout: { title: "Reponsive plotly chart", width: 500, height: 400 }
// };
//
// export default function PlotRegion(props) {
//   const responsiveChartRef = useRef();
//
//
//     const [config, setConfig] = useState({...{ responsive: true }});
//     const [data, setData] = useState([props.plotly_data]);
//     const [layout, setlayout] = useState(props.plotly_layout);
//
//     console.log('PlotRegion data', data)
//     console.log('PlotRegion props.plotly_data', props.plotly_data)
//
//     // const copiedLayout = Object.assign({}, layout);
//
//     // if (responsiveChartRef) {
//     //   if (responsiveChartRef.current) {
//     //     console.log('In if PlotRegion responsiveChartRef', responsiveChartRef);
//     //     const elREF = responsiveChartRef.current;
//     //     const el = elREF;
//     //     copiedLayout.width = el.parentNode.getBoundingClientRect().width-24;
//     //     copiedLayout.height = el.getBoundingClientRect().height;
//     //   }
//     // }
//
//
//     const resizeListener = (() => {
//       if (responsiveChartRef) {
//         if (responsiveChartRef.current) {
//           console.log(responsiveChartRef.current)
//           const elREF = responsiveChartRef.current;
//           const el = elREF;
//           const width = el.parentNode.getBoundingClientRect().width-24;
//           const height = el.getBoundingClientRect().height;
//           // console.log('resize', layout);
//           // console.log('resize new', {...layout, width, height});
//           //
//           // _setlayout(prevState =>({...prevState, width, height }));
//         }
//       }
//     })
//
//     useEffect(() => {
//       console.log('useEffect', props.plotly_data)
//        resizeListener();
//        window.addEventListener('resize', resizeListener, false);
//        return () => window.removeEventListener('resize', resizeListener, false);
//      }, []);// run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([])
//
//           // this.resizeListener = window.addEventListener("resize", () => {
//           //
//           //   const elREF = this.responsiveChartRef.current;
//           //   const el = elREF;
//           //
//           //   const copiedLayout = Object.assign({}, this.props.plotly_layout);
//           //   copiedLayout.width = el.parentNode.getBoundingClientRect().width-24;
//           //   copiedLayout.height = el.getBoundingClientRect().height;
//           //   console.log('resize', copiedLayout.height, copiedLayout.width);
//           //
//           //   this.setState({
//           //     layout: copiedLayout
//           //   });
//           // });
//
//     // use the react effect to control when location and regions change to repupulalte the climate varible pulldown
//     // useEffect( (responsiveChartRef, copiedLayout) => {
//     //   setlayout(copiedLayout);
//     //
//     // }, [responsiveChartRef, copiedLayout]);
//
//
//
//     //
//     // const copiedLayout = Object.assign({}, layout);
//     // copiedLayout.width = el.parentNode.getBoundingClientRect().width-24;
//     // copiedLayout.height = el.getBoundingClientRect().height;
//     // setlayout(copiedLayout);
//
//     //
//     //
//     // const elREF = responsiveChartRef.current;
//     // const el = elREF;
//     // console.log('responsiveChartRef', responsiveChartRef)
//     // const copiedLayout = Object.assign({}, layout);
//     // copiedLayout.width = el.parentNode.getBoundingClientRect().width-24;
//     // copiedLayout.height = el.getBoundingClientRect().height;
//     // setlayout(copiedLayout);
//     // this.setState({
//     //   layout: copiedLayout
//     // });
//
//     // const data = this.props.plotly_data;
//     const frames = {};
//
//     return (
//       <div ref={responsiveChartRef}>
//         <Plot
//             data={data}
//             layout={layout}
//             config={config}
//         />
//       </div>
//     )
// }
//
// const resizeListener = (event, newValue) => {
//   // setValue(newValue);
// };


import React from 'react';
import Plot from 'react-plotly.js';

class PlotRegion extends React.Component {
  state = {
    layout: { title: "Reponsive plotly chart", width: 500, height: 400 }
  };

  constructor(props) {
      super(props)
      this.responsiveChartRef = React.createRef();
      this.setState({
        layout: props.plotly_layout
      });
  }


  componentDidMount() {
    this.resizeListener = window.addEventListener("resize", () => {
      const elREF = this.responsiveChartRef.current;
      const el = elREF;

      const copiedLayout = Object.assign({}, this.props.plotly_layout);
      copiedLayout.width = el.parentNode.getBoundingClientRect().width;
      copiedLayout.height = el.getBoundingClientRect().height-24;
      console.log('resize', copiedLayout.height, copiedLayout.width);

      this.setState({
        layout: copiedLayout
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener(this.resizeListener);
  }

  render() {
    const copiedLayout = Object.assign({}, this.props.plotly_layout);
    const data = this.props.plotly_data;
    const config = {...{ responsive: true }};
    const elREF = this.responsiveChartRef.current;
    if(elREF) {
      const el = elREF;
      copiedLayout.width = el.parentNode.getBoundingClientRect().width;
      copiedLayout.height = el.getBoundingClientRect().height-24;
    }


    return (
      <div
        {...{
          ref: this.responsiveChartRef,
        }}
        >
        <Plot
          data={data}
          layout={copiedLayout}
          config={config}
          revision={Math.floor(Math.random() * 100000)}
          />
      </div>
    );
  }
}

export default PlotRegion;
