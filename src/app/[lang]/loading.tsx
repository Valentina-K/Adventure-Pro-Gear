import Container from '@/components/Container';

// ToDo: replace style with module
const style = {
  fontSize: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '100px auto',
  fontWeight: '600',
};

export default function Spinner({ ...props }) {
  return (
    <Container>
      <div className="loader" style={style}>
        Loading...
      </div>
    </Container>
  );
}
