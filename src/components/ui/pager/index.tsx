import { Button } from '@/components/ui/button';
import { PageInfo, Wrapper } from './index.styles';

interface PagerProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pager({ page, pageSize, total, onPageChange }: PagerProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Wrapper>
      <PageInfo>
        Página {page} de {totalPages} · {total} no total
      </PageInfo>
      <Button
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Anterior
      </Button>
      <Button
        variant="secondary"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Próxima
      </Button>
    </Wrapper>
  );
}
