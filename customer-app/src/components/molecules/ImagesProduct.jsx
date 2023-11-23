// import '../../global.css';
// import './styles/molecules.css';


// export default function ImagesProductProduct (props) {
//   let navigate = useNavigate();

//   const handleSizeChange = async (e) => {
//     let selectedSize = e.target.value;
//     let productVariation = props.product.productVariations.find((v) => v.size === selectedSize);

//     navigate(`/Product/${props.product.id}/ProductVariation/${productVariation.id}`);
//   };
  
//     return (
//         <div className="size-selector-container">
//             <select className="size-selector" value={props.productVariation.size} onChange={(e) => handleSizeChange(e)}>
//             {props.product.productVariations.map((variation) => (
//                 <option className="size-selector-option" key={variation.id} value={variation.size}>
//                 {variation.size}
//                 </option>
//             ))}
//             </select>
            
//             <div className="size-selector-text-container">
//                 <span className="size-selector-text"></span>
//             </div>
//       </div>
//     );
//   };