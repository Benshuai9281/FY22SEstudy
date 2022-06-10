
int main(void){
    int i;
    for (i = 1; i <= 100; i++)
    {
        if (i % 3 == 0 && i % 5 == 0)
        {
            printf("%d:KonicaMinolta\n", i);
            continue;
        }
        else if (i % 5 == 0)
        {
            printf("%d:Minolta\n", i);
            continue;
        }
        else if (i % 3== 0)
        {
            printf("%d:Konica\n", i);
            continue;
        }
        else
        {
            printf("%d:\n", i);
        }
    }
  return 0;
  }
