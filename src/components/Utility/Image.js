import React from 'react';

const Image = ({data, ...props }) => {
return(
<img {...props} src={`data:image/jpeg;base64,${data}`} />
)

}
export default Image;