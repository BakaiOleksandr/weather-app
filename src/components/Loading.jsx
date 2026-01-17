import {useLoading} from '../context/LoadingContext';
export default function Loading() {
  const {loading} = useLoading();
  if (!loading) return null;
  return (
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  );
}
