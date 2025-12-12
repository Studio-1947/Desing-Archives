import DiscussionDetail from "@/components/community/DiscussionDetail";

export default function DiscussionPage({ params }: { params: { id: string } }) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <DiscussionDetail id={params.id} />
        </div>
    );
}
