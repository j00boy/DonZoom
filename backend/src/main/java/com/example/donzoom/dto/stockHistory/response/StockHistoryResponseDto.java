package com.example.donzoom.dto.stockhistory.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockHistoryResponseDto {

  private Long stockHistoryId;
  private Float price;
  private LocalDateTime createdAt;

}
