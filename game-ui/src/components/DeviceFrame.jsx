export default function DeviceFrame({ children }) {
  return (
    <div className="device-frame">
      <div className="device-inner">
        {children}
      </div>
    </div>
  );
}
