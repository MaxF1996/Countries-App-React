import { Grid } from 'react-loader-spinner';

export default function LoadingGrid() {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Grid
        visible={true}
        height="50"
        width="50"
        radius="12.5"
        color="var(--font-color)"
        ariaLabel="grid-loading"
        wrapperStyle={{}}
        wrapperClass="GridLoader"
      />
    </div>
  );
}
