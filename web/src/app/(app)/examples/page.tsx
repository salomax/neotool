import Link from 'next/link';

export default function ExamplesIndex() {
  return (
    <main style={{ padding: 24 }}>
      <h2>Examples</h2>
      <ul>
        <li><Link href="/examples/forms/customer">Customer Form</Link></li>
      </ul>
    </main>
  );
}
