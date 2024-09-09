package com.example.donzoom.dto.stock.request;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockRequestDto {

  private Float price;
  private LocalDateTime createdAt;

}