interface ComingSoonBadgeProps {
    className?: string;
}

export default function ComingSoonBadge({ className }: ComingSoonBadgeProps) {
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 border border-gray-300 text-gray-500 text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap ${className || ''}`}
        >
            Coming Soon
        </span>
    );
}
