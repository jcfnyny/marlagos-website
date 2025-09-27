import Layout from '../Layout';

export default function LayoutExample() {
  return (
    <Layout>
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold text-center">Sample Page Content</h1>
        <p className="text-center text-muted-foreground mt-2">This is how content appears within the layout.</p>
      </div>
    </Layout>
  );
}