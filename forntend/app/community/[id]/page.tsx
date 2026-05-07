import DiscussionDetail from "@/components/community/DiscussionDetail";

export default async function DiscussionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <DiscussionDetail id={id} />
        </div>
    );
}
