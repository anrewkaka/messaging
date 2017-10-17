SELECT
    EX.ID,
    STCK.ID STCK_ID,
    STCK.NM,
    STCK.HST,
    STCK.API_KEY,
    STCK.SECRET_KEY,
    PRD.ID PRD_ID,
    PRD.NM,
    EX.DTTM,
    EX.BUY_PRC,
    EX.QTY,
    EX.TG1,
    EX.TG2,
    EX.TG3,
    EX.LOW_PRC_SELL,
    EX.SELL_PRC,
    EX.FEE,
    EX.STS,
    EX.LGC_DEL_FLG
  FROM
    EXCHANGE EX
    INNER JOIN STOCK STCK
      ON EX.STCK_ID = STCK.ID
      AND STCK.LGC_DEL_FLG = '0'
    INNER JOIN PRODUCT PRD
      ON EX.PRD_ID = PRD.ID
      AND PRD.LGC_DEL_FLG = '0'
  WHERE
    STCK.ID = /*stockId*/'1'
    AND EX.PRD_ID = /*productId*/'1'
    AND EX.LGC_DEL_FLG = '0'
