import { useState, useEffect } from "react";

export default function ProgressBar(props) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 3000/props.mode; // 4 seconds
        const intervalTime = 50; // Update every 50ms
        const increment = (100 * intervalTime) / duration;

        setProgress(0); // Reset progress on re-mount

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev + increment >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + increment;
            });
        }, intervalTime);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // ✅ Delay setting `setIsLost(true)` by 50ms after progress reaches 100%
    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                props.setIsLost(true);
            }, 60); // 60ms delay

            return () => clearTimeout(timeout); // Cleanup timeout on unmount
        }
    }, [progress]); // Runs when `progress` changes

    return (
        <div className="fixed top-0 left-0 w-full h-6 bg-gray-300">
            <div
                className="h-6 bg-blue-500 transition-all duration-50"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}
